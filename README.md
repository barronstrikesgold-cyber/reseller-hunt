# Reseller Hunt

Phone buy/pass for aisle hunting. Tonight list, cash left after ~13% fees and your ship estimate, ledger on this phone.

## Open on iPhone (Safari)

Lasting public link (GitHub Pages):

**https://barronstrikesgold-cyber.github.io/reseller-hunt/**

Repo: https://github.com/barronstrikesgold-cyber/reseller-hunt

If that 404s, GitHub still needs Pages turned on once: open the repo on the phone → **About** → **Settings** is easier from a computer: **Settings → Pages → Source: GitHub Actions**. Then wait for the Actions green check.

This app is a static site. Any https host of the `out/` folder works. `localhost` and file attachments do not open in iPhone Safari.

## What it does

- **Tonight** — checkable peg list. Survives reload.
- **Cash** — enter shelf price or pick a tonight item. Compare only to a stored sold number. Subtract ~13% fees and an editable ship estimate. Buy only if leftover cash is real. No sold number = unknown. Never invents a sold or a profit.
- **Books** — cost, store, date, fees, sale, cash in. Profit is after those.
- **Lists** — full aisle lists + dated Pokémon releases.

Stored solds only: F40 $122, Civic Custom $73, Lotus Sport Elise $50, Mustang GTD $53, Impala $51. Cuda, Firebird, Skyline, Porsche Super, Ram, Matchbox chases, Pokémon 30th ETB: no settled sold. ETB printed $49.99 Sept 16 — buy only at printed, no verified resale.

## Local

```bash
npm install
npm run build
npm start
```
