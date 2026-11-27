# AGENTS.md

たまたま当たった？：止まった時計・羊に見える岩・かげろうと水などの短い話を読み、その人が「知っていた」「たまたま当たった」「外れていた」のどれかを選ぶ1日5問の学習ゲーム（ゲティア問題）。知っていたでなければ、2段目で「どの札が欠けた？」（理由の札・当たりの札・運の札）も選ぶ。答え合わせは3つの札（よい理由があったか／信じたことが当たっていたか／理由と当たりが運でつながっていないか）で見せる。`index.html` と `data.js`（話の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 話（24種類×3000問：答えと札と2段目が別に書いた表どおり・出典がある）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 考え方の出どころは Gettier 1963（Analysis 23(6): 121–123）・Russell 1948『Human Knowledge: Its Scope and Limits』（止まった時計）・スタンフォード哲学百科事典「The Analysis of Knowledge」だけ。数字（1963年・3ページ・1948年・770年ごろ）はこの資料で確かめたもの。出典の URL は README と data.js の SRC。
- 話は日常の作り話。特定の人・国・団体のよい悪いをくらべない。名前を出さず「友だち」「家族」「店長」などで書く。偽の納屋（Ginet・Goldman）のように「知識でない」と言い切れない人が多い例は、答えのある問題にしない。
- 種類を足すときは `qa/run.mjs` の `TB`（別に書いた表：種類 → 答え・3つの札・2段目）にも足す。札は、最初に欠けた札が2段目の答えで、理由か当たりが欠けたら運の札は「見ない」（null）。
- 1段目の選び肢はいつも3つ（知っていた・たまたま当たった・外れていた）を同じ順で出す。2回目のヒントはまちがいを1つ消して2つにしぼり、考え方の言葉（`key`）も見せる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「どの札が欠けた？」・復習（1→3→7日後）。記録 `tmt-v1`・文字 `tmt-fs`・復習 `tmt-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は どこの裁判所？（saibansho-doko。その元は 裁判の期限 ほか）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
