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

```
$ node watch.js [LINE Notify トークン] [市区町村コード] [日付]
```

## Sample

```
node watch.js abcdefgabcdefgabcdefga 131130 2021-07-16
```
