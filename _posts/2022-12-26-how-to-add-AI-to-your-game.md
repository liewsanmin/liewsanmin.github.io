---
title: "How to add AI to your game"
layout: post
date: 2022-12-26
blog: true
tag:
- game
- AI
---

![spaceship](https://liewsanmin.github.io/images/alien_world/spaceship.jpg)
*Created by Dall-E*

Are you looking to add a fun and interactive element to your game development project? Look no further, because using Python and [OpenAI's API](https://beta.openai.com/docs/introduction), you can easily add artificial intelligence (AI) to your game to create a unique and engaging experience for your players.

Here is the [repo](https://github.com/liewsanmin/text_based_world/)!

In the sections below, we see the design and implementation of a virtual text-based game where the player is stranded on an alien planet and must navigate through various locations in order to escape. The player is given math puzzles to solve at each location, and if they answer correctly, they are congratulated and can move on to the next location.

# Design

When designing the game. The idea was to allow the AI to generate the world for the game and present the player with two options at each turn, with the AI deciding when the game would end.

```python
game_start = "You will create a text-based game where I have to choose 2 options you give at the begining of each turn. Be creative of the game."
game = game_start
ai_name = "\nAI: "
player_name = "\nHuman: "

while True:
    try:
        game += ai_name
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=game,
            temperature=0.93,
            max_tokens=3577,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0.6,
            stop=["AI", "Human"]
            )
        ai_response = response.choices[0].text
        prompt = f"{ai_name}{ai_response}"
        game += response.choices[0].text
        print(prompt)
        print(player_name)
        player_response = input()
        game += f'{player_name}{player_response}'
        
    except Exception as e:
        print(f'Looks like the game crashed! Trying again: {e}')
        time.sleep(10)
```

However, I encountered an issue when the game crashed with the message 

```
This model's maximum context length is 4097 tokens, however you requested 4128 tokens (551 in your prompt; 3577 for the completion). Please reduce your prompt; or completion length.
```

Instead of [purchasing additional tokens](https://openai.com/api/pricing/), I decided to split up the AI's tasks in order to reduce the burden on the model and avoid exceeding the maximum context length. This allowed me to continue designing and developing the game without incurring additional costs.

# Implementation

First, we import the necessary libraries and set the API key for OpenAI:

```python
import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")
```

Next, we define some variables for the game, including the names of the AI and player, and a list of locations that the player can visit:

```python
ai_name = "\nAI: "
player_name = "\nHuman: "
locations = ["Crash Site", "Alien City", "Portal"]
```

We also define some prompts for each location in the game, including the introduction to the game and a puzzle for the player to solve:

```python
intro = "A virtual text-based game where the player crash landed into an alien world"
solve_prompt = "give the player a fun simple math puzzle to solve, make sure it's related to the theme. Do not give me the answer"
congratz_prompt = "If the player answers correctly, say 'congratulations', else don't say 'congratulations'"
crash_site_prompt = f"{intro}. The player is now in a crash site, {solve_prompt} {congratz_prompt}"
alien_city_prompt = f"{intro}. The player is now in an alien city, {solve_prompt} {congratz_prompt}"
portal_prompt = f"{intro}. The player is now in a portal to return home, {solve_prompt} {congratz_prompt}"
location_prompts = {
    "Crash Site" : crash_site_prompt, 
    "Alien City" : alien_city_prompt, 
    "Portal" : portal_prompt
    }
```

One of the key features of this code is the use of OpenAI's API, specifically the Completion endpoint. This endpoint allows us to generate text based on a given prompt, and in this case, we use it to generate responses for the AI character in the game. We can also customize the response by adjusting various parameters, such as the temperature, which determines the randomness of the AI's response, and the maximum number of tokens, which limits the length of the response.

The solve_puzzle function, which uses OpenAI's GPT-3 API to generate responses and prompts for the player to solve the puzzle:

```python
def solve_puzzle(location, prompt):
    game = ""
    game = prompt
    while True:
        try:
            game += ai_name
            response = openai.Completion.create(
                model="text-davinci-003",
                prompt=game,
                temperature=0.96,
                max_tokens=3700,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0.6,
                stop=["AI", "Human"]
                )
            ai_response = response.choices[0].text
            prompt = f"{ai_name}{ai_response}"
            game += response.choices[0].text
            print(prompt)
            if "congratulations" in (ai_response).lower():
                break
            print(player_name)
            player_response = input()
            game += f'{player_name}{player_response}'
        except Exception as e:
            print(f'Looks like the game crashed! {e}')
```

That's it! Start integrating AI into your game development projects today and take your games to the next level!

Below are some of the screenshots of the game :)

If you answer all the puzzles correctly, you end the game after getting into the final location. The portal back home!

![prompt_1](https://liewsanmin.github.io/images/alien_world/prompt_1.jpg)
![prompt_2](https://liewsanmin.github.io/images/alien_world/prompt_2.jpg)
![prompt_3](https://liewsanmin.github.io/images/alien_world/prompt_3.jpg)
![prompt_4](https://liewsanmin.github.io/images/alien_world/prompt_4.jpg)

But if you answer one of them incorrectly, the AI asks you to try again:

![retry](https://liewsanmin.github.io/images/alien_world/retry.jpg)

And if you're stuck on a puzzle. You can always ask for hints, how cool is that!?!

![hint](https://liewsanmin.github.io/images/alien_world/hint.jpg)
