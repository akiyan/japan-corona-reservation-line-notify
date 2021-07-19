import axios from 'axios';
import commander from 'commander';
import querystring from 'querystring';

commander
  .usage('[place code] [dates (commana separated)]')
  .option('-t, --token [line notify token]', 'line notify token')
  .option('-e, --exclude [department name exclude regexp]', 'exclude department name regexp')
  .parse(process.argv);
const code = commander.args[0];
const dates = commander.args[1].split(',');
const options = commander.opts();
const now = new Date;

(async function() {
  const places = {};
  await axios.get(`https://api-cache.vaccines.sciseed.jp/public/${code}/department/`).then(res => {
    res.data.department.forEach(v => {
      places[v.id] = v;
    });
  });

  const times = [];
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const url = `https://api-cache.vaccines.sciseed.jp/public/${code}/reservation_frame/?item_id=1&start_date_after=${date}&start_date_before=${date}`;
    await axios.get(url).then(res => {
      res.data.reservation_frame.forEach(v => {
        const last = v.reservation_cnt_limit - v.reservation_cnt;
        const department = places[v.department].name;
        const d = new Date(v.start_at.replace('+', '.000+'));
        if (last && now < d && (!options.exclude || !department.match(options.exclude))) {
          const time = v.start_at.substr(11, 5);
          times.push(`${date} ${department} ${time}～`);
        }
      });
    });
  }
  times.sort();


  if (times.length > 0) {
    console.log(times.join("\r\n"));
    if (options.token) {
      await axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        headers: {
          Authorization: `Bearer ${options.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: querystring.stringify({
          message: times.join("\r\n"),
        }),
      }).then( function(res) {
      }).catch( function(err) {
        console.error(err);
      });
    }
  }
})();
