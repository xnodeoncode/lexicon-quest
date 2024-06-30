# Lexicon Quest

A guessing game that presesnts a random word, and the player must guess the correct spelling within a preset number of attempts.

### The Static Dictionaries

The game has three static dictionaries based on terms from Astronomy, US States, and The Simpsons TV Show. The static dictionaries provide a fall back if a dictionary service is not available.

### The Dictionary Service

The dictionary service is designed to make a fetch (GET) request to an api using an api key and request url from a service configuration object. The fetch request is called on an interval populating a collection of terms to be used in the game. Once an adequate number of terms have been accumulated the game switches to online dictionary mode.

If the service becomes unavailable at any time during play, the game will fall back to the static dictionaries.
