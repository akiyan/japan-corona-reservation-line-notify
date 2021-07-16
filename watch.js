import axios from 'axios';
import commander from 'commander';
import querystring from 'querystring';

commander.parse(process.argv);
const code = commander.args[0];
const dates = [commander.args[1]];
const token = commander.args[2];

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
        if (last) {
          times.push(`${date} ${places[v.department].name} ${v.name}`);
        }
      });
    });
  }

  if (times.length > 0) {
    console.log(times.join("\r\n"));
    if (token) {
      await axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        headers: {
          Authorization: `Bearer ${token}`,
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
