# YashBot

A conversational chat utility bot for Discord, built in 2017 to 2018. It uses [wit.ai](https://wit.ai) for natural-language understanding, well before mainstream LLM assistants existed.

Instead of fixed command parsing, YashBot sends free-text queries to wit.ai, reads back the recognised intents and their confidence scores, and routes each query to the right backend to fulfil it.

## How it works

The `!ask` command is the core of the bot:

1. The user's message is sent to wit.ai via the `node-wit` SDK.
2. wit.ai returns a set of entities (intents) with confidence scores.
3. The bot checks entities against confidence thresholds and routes to a matching handler.
4. If no intent clears its threshold, the bot falls back to a "did not understand" response.

Recognised intents and their backends:

| Intent | Backend / behaviour |
|---|---|
| Math expressions and rounding | `mathjs` evaluation |
| Weather | OpenWeatherMap, plus Google Time Zone API for local sunrise/sunset, output in K, C and F |
| Factual "who/what is" questions | Wikipedia API (search then extract) |
| Computational queries | Wolfram Alpha |
| GIF search | Giphy API |
| Meme search | Google Custom Search (with a few hardcoded classics) |
| Greetings, farewells, small talk | Canned responses |

## Commands

* `!ping` - Checks connection latency to chat and the API.
* `!ask <query>` - Sends a natural-language query to wit.ai. Examples:
  * `!ask 57*21` or `!ask round 15.4545` (math)
  * `!ask weather sydney` (weather)
  * `!ask who is Ada Lovelace` (Wikipedia)
  * `!ask cat gif` (Giphy)
* `!say <text>` - Echoes the text and removes the original command message.
* `!clearchat <n>` - Deletes the last `n` messages. Requires the `Admin` role.
* `!help` - Lists available commands.

## Tech stack

Node.js, discord.js, node-wit (wit.ai), mathjs, wolfram, and the Giphy, OpenWeatherMap, Google Time Zone, Google Custom Search and Wikipedia APIs.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Provide credentials. The bot reads from a local `config.json` if present, otherwise from environment variables:

   ```
   discordKey
   witKey
   wolframKey
   giphyKey
   youtubeKey
   ```

   The weather, time zone and image-search integrations also require their own API keys. Supply all keys through `config.json` or environment variables. Do not commit real keys to the repository.

3. Run the bot:

   ```
   npm start
   ```

## Note

This is an early personal project from 2017 to 2018. It predates modern LLM chat assistants and was an experiment in intent-based conversational routing using the tools available at the time.

## License

MIT
