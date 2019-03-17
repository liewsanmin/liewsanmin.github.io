---
title: "Introducing Automation Tools"
layout: post
date: 2019-03-16
blog: true
tag:
- work
- gRPC
- telnet
---

![Markdown Image][1]
*My favorite Double 00 Raiser, I'm sure this goes through major firmware testing*

Some of the best ways to communicate to say a local server is through telnet and gRPC

## Telnet

[Telnet](https://en.wikipedia.org/wiki/Telnet), this protocol is still used everywhere in the automation testing industry. Providing bidirectional interactive text-oriented communication facility between the client and the server. You can easily open a [python telnet connection](https://docs.python.org/3.7/library/telnetlib.html) and communicate with the server while creating automation scripts in parallel. 

However, since Telnet is only text-based it is more difficult parse information as the results from the server needs additional formatting.

## Introducing gRPC
    
One of the latest frameworks I use on a daily basis at work is the remote procedure call (RPC) from [Google gRPC](https://grpc.io/). This, my friends, is a major upgrade from command the line interface. 

Now, you can use this framework to define the entire server's structure. As the client invokes any method (query or command), the responses are in an organized and effective structure and higher level unit testers can easily use this information for quicker verification purposes.

## Comparison - Telnet

Let's say you're getting the hardware's information from telnet it would look like this:

{% highlight python %}
tn = initializeTelnet()
tn.write('getunitinfo')
result = tn.read_very_eager()
{% endhighlight %}

The 'result' is just a plain text form (originally converted from bytes but that's not the main point):

`
Unit Number: 1234 \r\n
Serial Number: 5678 \r\n
`

But the value you need while scripting the automation scripts is the actual unit number and serial number. 

## Comparison - gRPC

gRPC however does that for you:

{% highlight python %}
result = ModemManager_Stub.GetInfo(clientChannel)
{% endhighlight %}

and the 'result' is a class where the response from the server is prefilled for you, all you need to do from now on is to access them using dot notation like so:

{% highlight python %}
unitInfo = result.unitInfo
serialNumber = result.serialNumber
{% endhighlight %}

Cool eyh? 

<!-- [1]: http://localhost:4000/images/gRPC/gundam.jpg -->

[1]: https://liewsanmin.github.io/images/gRPC/gundam.jpg