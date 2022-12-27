---
title: "How to add AI to your game"
layout: post
date: 2022-12-26
blog: true
tag:
- game
- AI
---

![Markdown Image][1]

Are you looking to add a fun and interactive element to your game development project? Look no further, because using Python and [OpenAI's API](https://beta.openai.com/docs/introduction), you can easily add artificial intelligence (AI) to your game to create a unique and engaging experience for your players.

In the tutorial below, we see the implementation of a virtual text-based game where the player is stranded on an alien planet and must navigate through various locations in order to escape. The player is given math puzzles to solve at each location, and if they answer correctly, they are congratulated and can move on to the next location.

First, we import the necessary libraries and set the API key for OpenAI:

{% highlight python %}
import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")
{% endhighlight %}

Next, we define some variables for the game, including the names of the AI and player, and a list of locations that the player can visit:

{% highlight python %}
ai_name = "\nAI: "
player_name = "\nHuman: "
locations = ["Crash Site", "Alien City", "Portal"]
{% endhighlight %}

We also define some prompts for each location in the game, including the introduction to the game and a puzzle for the player to solve:

{% highlight python %}
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
{% endhighlight %}

One of the key features of this code is the use of OpenAI's API, specifically the Completion endpoint. This endpoint allows us to generate text based on a given prompt, and in this case, we use it to generate responses for the AI character in the game. We can also customize the response by adjusting various parameters, such as the temperature, which determines the randomness of the AI's response, and the maximum number of tokens, which limits the length of the response.

The solve_puzzle function, which uses OpenAI's GPT-3 API to generate responses and prompts for the player to solve the puzzle:

{% highlight python %}
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
{% endhighlight %}

That's it! Start integrating AI into your game development projects today and take your games to the next level!

Below are some of the screenshots of the game :)

If you answer all the puzzles correctly, you end the game after getting into the final location. The portal back home!

![Markdown Image][2]
![Markdown Image][3]
![Markdown Image][4]
![Markdown Image][5]

But if you answer one of them incorrectly, the AI asks you to try again:

![Markdown Image][6]

And if you're stuck on a puzzle. You can always ask for hints, how cool is that!?!

![Markdown Image][7]

[1]: https://liewsanmin.github.io/images/alien_world/spaceship.jpg
[2]: https://liewsanmin.github.io/images/alien_world/prompt_1.jpg
[3]: https://liewsanmin.github.io/images/alien_world/.jpg
[4]: https://liewsanmin.github.io/images/alien_world/.jpg
[5]: https://liewsanmin.github.io/images/alien_world/.jpg
[6]: https://liewsanmin.github.io/images/alien_world/.jpg
[7]: https://liewsanmin.github.io/images/alien_world/.jpg