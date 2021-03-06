# 新型コロナワクチン接種予約サイト空き状況LINE通知スクリプト

## Dependences

- 新型コロナワクチン接種予約サイト
  - https://vaccines.sciseed.jp/shibuya/ (渋谷区)
- nodejs
- npm
- LINE Notify

## Install

- npm i

## Usage

LINE通知なし
```
$ node watch.js [市区町村コード] [日付]
```

LINE通知あり
```
$ node watch.js [市区町村コード] [日付] [LINE Notify トークン]
```

## Sample

```
$ node watch.js 131130 2021-08-18 abcdefgabcdefgabcdefga
2021-08-18 NHK渋谷フレンドシップシアター 午後16
2021-08-18 NHK渋谷フレンドシップシアター 午後17
2021-08-18 NHK渋谷フレンドシップシアター 午後18
2021-08-18 NHK渋谷フレンドシップシアター 午後19
2021-08-18 NHK渋谷フレンドシップシアター 午後20
2021-08-18 NHK渋谷フレンドシップシアター 午後21
2021-08-18 MYメディカルクリニック 18:00-18:30
2021-08-18 MYメディカルクリニック 18:30-19:00
2021-08-18 MYメディカルクリニック 19:00-19:30
2021-08-18 長岩医院 午後7
...
```

![LINE](line-screenshot.png)
