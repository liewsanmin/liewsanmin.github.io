---
title: "Guide to Scrape Data from an Investment Stock Website"
layout: post
date: 2016-06-30
blog: true
tag:
- webscraping
- stock investment
---

In order to understand the stock market, my elder brother Anthony gives me
monthly assignments to research the stock market in Malaysia. And I have to
report 2 to 3 stocks and give legit reasons why I chose them before
purchasing one. But my monthly research involves repeating the same steps:

1. Go to the [stock investment portal](http://klse.i3investor.com/jsp/pt.jsp)
2. Open multiple links that analyst recommends to buy
3. Compile a list of quality stocks with good reasons

To save me the hassle of repeating the same steps I created a Python script and
be done with the assignment as soon as possible (because I am lazy). For now,
this script can only do step 1 and step 2. Keep in mind this post is catered
towards Mac / Ubuntu users.

Unfortunately, i3investor does not have an API but all is well. My approach is
to mine data using [webscraping](http://docs.python-guide.org/en/latest/scenarios/scrape/)
method.

First, let's look at the repeated steps that I have to go through each time.
If you go the portal, you can see the following table that looks this :

![Markdown Image][1]
*Screenshot 6/30/2016 from Joshua's Macbook*

As you can see there are many stocks to choose from and the 'Price Call' tab
represents what analysts from different professional firms has to say about the
particular stock. So what I usually do is to open multiple tabs that has 'BUY'
as the keyword at the 'Price Call' tab.

What my script does is that it connects to the stock portal and opens all stocks
that the analyst says 'BUY' in different tabs. The result looks like what you
think it is.

![Markdown Image][2]

Sounds easy enough? Good you're getting there.

## Step 1:
Before you we go into details you
would need to install [lxml](http://lxml.de/), [requests](http://docs.python-requests.org/en/master/)
, and [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
on your Terminal:

{% highlight python %}
pip install lxml
pip install requests
pip install BeautifulSoup
{% endhighlight %}

## Step 2:
Alright let's start coding, we need to import these libraries for the python
module to work.

{% highlight python %}
import requests
from BeautifulSoup import BeautifulSoup
import lxml.html
import webbrowser
{% endhighlight %}

## Step 3:
We then need the script to connect to the portal. I took the actual url and
hardcoded it in. The 1st function looks like this

{% highlight python %}
def connectAllPriceTarget():
    global soup
    priceTargetUrl = 'http://klse.i3investor.com/jsp/pt.jsp' # get url
    page = requests.get(priceTargetUrl) # connect to page
    html = page.content # get html content
    soup = BeautifulSoup(html) #beautify the html page
{% endhighlight %}

## Step 4:
Once the script is connected to the website. Web scraping begins here. If you
see the actual page source of this site, it looks ugly. BeautifulSoup does a
good job 'beautifying' the html page for your convenience.

To understand the different tags and to know which one to scrape, I created the
html page from below :
{% highlight python %}
with open("allPriceTarget.html", "w") as myfile:
    myfile.write(soup.prettify())
{% endhighlight %}

Here's a snapshot of before / after look on the html file:

before:
{% highlight python %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>      <title>Stock Price Target | I3investor</title> <meta http-equiv="content-type" content="text/html; charset=utf-8" />  <meta http-equiv="X-Frame-Options" content="deny"/> <meta name="description" content="A free and independent portal for stock investors. The portal provides aggregated investment Blogs and News, Stock Database & Quotes, Price Targets, and Watchlist/Portfolio tool for investors." /> <meta name="keywords" content="Stock Price Target,Bursa Malaysia" /> <link rel="icon"
{% endhighlight %}

after :
{% highlight python %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
 <head>
  <title>
   Stock Price Target | I3investor
  </title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-Frame-Options" content="deny" />
  <meta name="description" content="A free and independent portal for stock investors. The portal provides aggregated investment Blogs and News, Stock Database &amp; Quotes, Price Targets, and Watchlist/Portfolio tool for investors." />
  <meta name="keywords" content="Stock Price Target,Bursa Malaysia" />
  {% endhighlight %}


Once I know which specific tags to scrape, I start compiling the links to these
stocks in a list
{% highlight python %}
def compileStocksAndLinks():
    table = soup.find('table', {'class': 'nc'})
    #for each row, there are many rows including no table
    global stockNames, priceTargetLinks
    stockNames = []
    priceTargetLinks = []
    for tr in table.findAll('tr'):
        center = tr.find('td', {'class': 'center'}) # for each center
        # not all rows have 'center' (price call)
        if(center and center.text == "BUY" and tr.find('a').get('href') not in priceTargetLinks):
            leftTag = tr.findAll('td', {'class': 'left'}) # find all 'left' that in that row
            stockNames += [leftTag[1].text]
            priceTargetLinks += [tr.find('a').get('href')]

{% endhighlight %}

I now have a list of stock names and their corresponding Price Target links

## Step 5:
The last function is to simply open each link in different tabs using the
[webbrowser](https://docs.python.org/2/library/webbrowser.html) library in Python

{% highlight python %}
def openPriceTargetLink():
    for link in priceTargetLinks:
        url = 'http://klse.i3investor.com' + link
        webbrowser.open(url, new=0, autoraise=True)
{% endhighlight %}

## Step 6:
Okay, all I need to do know right now is to call these 3 functions and boom!
script success, time to research stock = reduced
{% highlight python %}
connectAllPriceTarget()
compileStocksAndLinks()
openPriceTargetLink()
{% endhighlight %}

[1]: https://liewsanmin.github.io/scrapeImages/allPriceTarget.jpg
[2]: https://liewsanmin.github.io/scrapeImages/scrapeResult.png
