---
title: "Common Embedded Errors, with real-life experience"
layout: post
date: 2023-01-10
blog: true
tag:
- embedded
- engineering
---

![spaceship](https://liewsanmin.github.io/images/common_embedded/flower.png)
*Created by Dall-E*

Embedded development can be a tricky and challenging process. In this blog post, we'll dive deep into the world of embedded errors and explore the common mistakes and issues that can arise. From memory errors to poorly defined variables, we'll cover it all. Join me as I share a real-life experience of my team's journey in navigating the embedded world, and discover the lessons we learned along the way. 

# Memory Errors

Memory errors are mainly out-of-bounds, stack overflow, heap corruption, etc.

When it comes to fleet telematics, a key component of our system is the ECU, which communicates with our product. Our team had set up a test suite to send fault codes and verify that when the fault count reached its maximum, the application would stop saving new faults to the local fault list array. The idea was that each time a new fault occurred, the application would attempt to send the fault to the backend for storage.

However, during testing, we encountered a hard fault. This was a major roadblock for us, and we knew that we needed to figure out why the program was crashing. To do this, we utilized the Keil debugger to step through each step of the program and study the legacy code. At the same time, we did a cleanup of the code to improve its overall quality.

After a thorough investigation, we discovered that the max array size of the packet to be sent to the backend to store the fault codes was smaller than the local array used to store the fault codes. This mismatch caused a hard fault when trying to memcpy arrays of different sizes. Additionally, we found poorly defined variables and poor code quality.

With this information in hand, we were able to fix the problem by increasing the size of the packet sent to the backend, and also did cleanup on poorly defined variables and poor quality code. And after the fix, we ran the test suite again, this time with success. We passed the test case, and our team was able to move on to the next steps in developing our fleet telematics product.

# Hardware Errors

Hardware failures are another error that happens very often. You're always wondering if it's software or hardware-related errors. These errors can range from peripherals, and sensors, to actuators.

This was the case for me as I was trying to debug a problem with a serial output not responding. Initially, I had no idea what could be causing the problem. I did notice, however, that while the serial output wasn't responding, I was still able to upload an image through J-flash without any issues.

I spent hours rummaging through all the possible causes, but it wasn't until I took a closer look at the board that I noticed something off. The power LED status on the device was dim when it was not supposed to turn on. This was the clue that I needed to dig deeper.

I reached out to the hardware team for help, and together we found out that the quartz crystal that was used as a frequency reference in a serial communication circuit was damaged. It was clear that the damage to the crystal was causing the circuit to operate at the wrong frequency or with unstable timing.

With this knowledge in hand, we quickly replaced the crystal and the problem was solved. The serial output began working again and the system was back to normal.

# Communication errors

This refers to issues that arise in the communication process between different components or subsystems within an embedded system. These errors can occur at various levels of the communication stack, including the physical, data link, network, transport, and application layers. Examples of embedded communication errors include:

* Data transmission errors caused by noise or interference on the communication channel
* Synchronization errors between devices due to incorrect timing or baud rate settings
* Protocol errors caused by incorrect implementation or mismatches between devices using different communication protocols
* Buffer overflow errors caused by receiving more data than can be handled by the buffer
* Packet errors caused by incorrect checksum, length, or format of the data packet
* Address errors caused by using the wrong device address or addressing scheme

In my experience, I was tasked with creating a test suite that followed a test plan written by the manager. Each test cycle lasted around 17 hours, during which we completed all 50 test cases, including setting the device to low power mode and making sure it turned on 60 seconds later by checking the current draw, among other things.

Despite our efforts, the test cycles were failing intermittently, with different types of failures. It was clear that we needed to identify the root cause of the intermittent failures, especially since some test cycles had passed all test cases.

I decided to tackle the problem by testing the test cases manually, understanding the difference between testing manually and running them by script. This helped me identify any variations that could be causing the failures.

After a thorough investigation, I was able to pinpoint a couple of root causes: the SSH connection was disconnecting because the Ethernet adapter was faulty, and one of the test cases was failing because the device was not fully booted up.

To solve the first problem, I simply reenabled the adapter, and to fix the second issue, I set the current check to > 100mA instead of > 5mA, as it was taking a while longer for the device to be fully booted up.

With these changes in place, all test cycles passed and the device was stable.

# Timing errors

Some examples of embedded timing errors include:

* Task scheduling errors, where tasks are not executed at the correct time or in the correct order
* Deadlines missed, which can cause the system to fail to meet real-time requirements
* Timing jitter, where the time between events varies unpredictably
* Clock drift, where the system clock runs at a different rate than expected
* Latency, where a delay occurs in the processing or communication of data
* Timing errors can have a significant impact on the performance and reliability of embedded systems, especially when they are designed to work in real-time environments. It is important to detect and correct these errors in order to maintain the proper functioning of the system.

We rely on real-time clocks (RTC) to keep our systems running on time, but what happens when the clock starts to drift? That's exactly what I found myself facing when I noticed that the RTC in our system was drifting faster than the current real-world time by over 80 seconds over a period of 30 days.

I knew I had to understand why the RTC time was drifting, so I set out to investigate the possible causes. Could it be that the RTC was not accurately calibrated? Maybe the RTC was running on a low-quality battery, or perhaps it was experiencing interference? And what about the prescalar, was it set correctly and not affecting the RTC to increment at an incorrect rate?

I dug deeper and deeper into the code and the hardware, looking for any clues that could shed light on the mystery. And after hours of research, experimentation, and a bit of detective work, I found that the RTC drift seemed to be caused by a combination of reasons which I can't pinpoint. To solve this problem, I added a margin of error in our specifications to account for the drift that will inevitably occur in the future.

# Software Errors

Software errors are probably the first thing everyone thinks is what went wrong. These can include issues with code quality, such as bugs, security vulnerabilities, or other problems that can cause the system to malfunction.

As developers, we take pride in our code, but sometimes, we inherit or end up with code that is not up to our standards. Such was the case when I was tasked with cleaning up a codebase that was suffering from poor code quality. The code was not using enums efficiently, there were no comments, and the variable naming was inconsistent and poor (TIMER_5 instead of RPM_TIMER).

I decided to take a gradual approach, making code changes as I worked on each bug, change request, and feature request. It was a slow process, but it allowed me to make steady progress and improve the code quality.

Over time, the codebase began to take shape. Different branches were used to manage different projects, but they were all handled under one master branch. The code quality improved, and we began using version control, which made it easier to track changes and keep the codebase organized.

I hope you learned something useful!
