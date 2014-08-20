##jQuery Race by Jason, John and Charles
========================================

Implements a tortoise/hare/mouse race betting game
This is derived from an original project "html-js" by Jason & Emmanuel

The user can select the participants of the race from three animals:
    hare, tortoise and mouse

As a new feature, the selection of racers no longer uses a dropdown box with
a default selected, but instead uses jQuery to fadeIn and fadeOut the selections

jQuery is also now used to set up the background image of the racers.

The user can place a bet on the race, which is now validated as a number using
jQuery so that input that cannot exceed the range with a maximum of the user's
wallet.

The animals go across the screen using a loop delay.
Then the winner is reported, and the users wallet updated.



Animal images are copyright Zynga (from Farmville).
Coding help from w3schools & stack overflow (especially loop delay in JS).
