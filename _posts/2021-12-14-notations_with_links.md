---
layout: post
title: "LaTeX and math notation with links to its definition."
categories: general
author: David Martínez-Rubio
excerpt_separator: <!--more-->
comments: true
---

You are reading some maths and you wonder what this notation you just read means. Maybe you are coming back to a text after some time. Maybe you just wanted to jump to Theorem 3 in a paper and read its statement. But you don't know what most of the notation means and definitions are inconveniently scattered across the whole text. Luckily, you don't need to scroll up for a while, skimming through the paper to find where each notation was defined. You can just click on the notation to jump to its definition and then you can jump back: the author had the courtesy of adding these links to the PDF document and you are happy they did.

---
**In this post, I explain how you can write maths with LaTeX so that all the instances of your main notations have a link to their definitions.**

Here is [my PhD thesis](https://damaru2.github.io/phd_thesis/thesis.pdf) in which I implement the idea. You can also see two of the individual papers on arXiv: [this one](https://arxiv.org/pdf/2012.03618v4.pdf), or [this other one](https://arxiv.org/pdf/2109.03678.pdf).

---

Defining your own commands in LaTeX for most of your math notation is considered good practice. If you decide to change the notation, you only need to update the command definition. It can also help to avoid mistakes like mismatching brackets or forgetting subindices. If you do this and wrap your notation with a hyperlink in the command definition, then you can place a hypertarget at the notation's definition. In this way, you can automatically generate non-intrusive links for all of your notations just by using your commands. I use the following code in order to define these wrapped commands and their hypertagets.

{% highlight tex %}
\usepackage[colorlinks=true]{hyperref} % Remove boxes around links
% \normalcolor is used so links are non-intrusive
\newcommand\newlink[2]{{\protect\hyperlink{#1}{\normalcolor #2}}}
\makeatletter
\newcommand\newtarget[2]{\Hy@raisedlink{\hypertarget{#1}{}}#2}
\makeatother
{% endhighlight %}

And I use them like this:
{% highlight tex %}
% Definitions:
\newcommand\simplex[1]{\newlink{def:simplex}{\Delta^{#1}}}
\newcommand\B{\newlink{def:Box}{B}}
...
% In document:
where $\newtarget{def:simplex}{\simplex{\n}}\defi \{\lambda \in \R^{\n} : \sum \lambda_i = 1,
\lambda \geq 0 \}$ is the $\n$-dimensional (probability) simplex.
...
define the box $\newtarget{def:Box}{\B} \defi [-\omega, 0]^{\n}$.
...
{% endhighlight %}

I understand that doing this for all of your notation can feel like a lot of work or a hard thing to ask a co-author to follow, but most of the time your notation is just one letter, and you can make the command (that you are using anyway) have a link to its definition effortlessly. If you write in a regular way, you can even use substitutions on your text after the fact in order to replace say, all the instances of your minimizer `x^\ast` of a function with the command `\xast` that you define after having written your text. And if you don't write so regularly and you don't want to define and type, say `\x[i][t]` for the notation that you like to chaotically write as `x_i^t`, `x^t_i`, or `x_{i}^t`, it is fine. You don't have to add links for all of your notation. You can also just do simple substitutions like only substituting your `x_i^t` which accounts for the majority of your $$x_i^t$$ and leave the others unedited. It is just a matter of adding helpful things to the point you are willing to bother. A little is enough. Also: vim (or equivalent) is your friend.

{% include _image.html url="/images/evince_link_preview.png" description="Figure 1: I don't use Evince often, but if you do, you can enjoy their internal link previews shown when you mouse hover, which could even save you the jump." %}


### Some use cases:

+ **Your single-letter notations**. Avoid an infinite loop in the definition by using something like this:
{% highlight tex %}
\let\oldepsilon\epsilon
\renewcommand\epsilon{\newlink{def:epsilon}{\oldepsilon}}
{% endhighlight %}

+ **Acronyms**: 
{% highlight tex %}
\newcommand{\LP}{\newlink{def:acronym_linear_programming}{LP}}
...for linear programming (\newtarget{def:acronym_linear_programming}{\LP{}}). 
Algorithms that use \LP{} as a subroutine...
{% endhighlight %}
...for linear programming (LP). Algorithms that use LP as a subroutine...

+ **Operators**. You can define the command to force you write the brackets, if it applies. But you can place the link for the operator's name only:
{% highlight tex %}
\newcommand{\innp}[1]{\langle #1 \rangle}
\newcommand{\bigotilde}[1]{\newlink{def:big_O_tilde}{ \widetilde{O} } ( #1 )}
\newcommand{\riemMinus}{\newlink{def:formal_riemannian_subtraction}{-}}
\newcommand{\astfenchel}{\newlink{def:asterisk_for_fenchel_dual}{\ast}}
...
...The notation $\newtarget{def:big_O_tilde}{\bigotilde{\cdot}}$ hides logarithmic 
factors with respect to...
...we use the formal notation \innp{v, 
y \newtarget{def:formal_riemannian_subtraction}{\riemMinus} x} = \innp{v, \exponinv{x}(y)}.
...we define $\psi^{\newtarget{def:asterisk_for_fenchel_dual}{\astfenchel}}: \R^n \to \R$ as
$ \psi^{\astfenchel}(z) = \min_{x\in\X}\{-\innp{z, x} + \psi(x)\}$.
{% endhighlight %}

...The notation $$\widetilde{O}(\cdot)$$ hides logarithmic factors with respect to...

...we use the formal notation $$\langle v, y-x \rangle = \langle v, \operatorname{Exp}^{-1}_x(y) \rangle$$.

...we define $$\psi^\ast: \mathbb{R}^n \to \mathbb{R}$$ as $$\psi^\ast(z) = \min_{x\in\mathcal{X}}\{-\langle z, x \rangle + \psi(x)\}$$.

+ **Others**: Your imagination is the limit. You can also do things like:

    1. Defining two commands with _different command names that output the same symbols_ but that mean different things in different contexts and that link to different definitions.

    2. Having two different commands that point to the same target (if you have, for instance, different commands for an operator and its inverse but you only define one of them).

    3. Wrapping a section in curly brackets `{}` and defining commands that are local to the section so you can, for instance, define `\alpha` as a thing in one section and as a completely different thing in another. Bonus points if you define the notations for each section in a separate file so you can `\input` it in your section and then maybe again in a corresponding section of the appendix.

    4. Even if the notation is not defined in the paper and is considered "_standard_", you can add an external link to its definition.

{% highlight tex %}
% Example for 2.
\let\oldlesssim\lesssim
\let\oldgtrsim\gtrsim
\renewcommand\lesssim{\newlink{def:less_or_greater_up_to_constant}{\oldlesssim}}
\renewcommand\gtrsim{\newlink{def:less_or_greater_up_to_constant}{\oldgtrsim}}
{% endhighlight %}


---

### Tips 

If you want to go the extra mile, you have to play with your unfriendly LaTeX.

+ As of the day of writing this update (Jan 12, 2023), the version of arXiv's default compiler doesn't know how to deal with nested links, in case you want to have some notation with a subindex with a notation, both having links, for example. If you place `\pdfoutput=1` in the [first 5 lines of your main file](https://arxiv.org/help/submit_tex#pdflatex), you will get PDFLaTeX processing and you will not have this problem.

+ Note that I am setting the font color to `\normalcolor`, which is the default color set in the preamble. This hack could not work in some contexts, namely if you locally set a different color. The command `\protect` is necessary when you use a hyperlink in some texts that LaTeX treats in a special way, like captions and section titles, but it doesn't hurt to add it all the time. Note the command `\newtarget` contains `\Hy@raisedlink`. This makes the target be a bit higher than the actual target, which corrects the way most readers jump which is that they place the hypertarget at the top edge of the screen, and you would normally want to jump a bit higher so you can read the line where the hypertarget is. 

+ It is relatively important to have the command you are defining in the second argument of newtarget (for instance, if you did `$\newtarget{def:Box}{}\B$` you could have problems. Or at least do not add two consecutive targets without anything in the middle.

+ If you use one of these commands in a subindex or superindex, do write the curly braces: write `\psi^{\astfenchel}` instead of `\psi^\astfenchel`.

+ If you have a table of contents, use the optional argument of `\section`s so you use the notation without black font in the table of contents but you use your command regularly in the section title in the main document.

{% highlight tex %}
\section[A section title with some notation like \texorpdfstring{$R$}{R}}]{
    A section title with some notation like $\R$}
{% endhighlight %}

+ You have to be careful if you use notations that have subindices and optional superindices or viceversa. Say, for instance, that you have $$x_k$$ and at some point you want to write $$x_k^2$$. Then, you have to either wrap the link just around $$x$$ (which is less precise) or you have to define an optional argument to write the superindex because if not, the link will create a box around $$x_t$$ and you will see something like $$x_t\ ^2$$. Note LaTeX allows doing `x_i^{}`. 
{% highlight tex %}
\usepackage{xargs}
% Optional superindex for exponentiating.
\newcommandx*\Ck[2][1=k, 2= , usedefault]{\newlink{def:Ck}{C_{#1}^{#2}}}
% Optional subindex for a vector entry
\newcommandx*\nuk[2][1=k, 2= , usedefault]{
    \newlink{def:remainder_trunc_coord_grad}{\nu^{( #1 )}_{#2}}}
% Usage:
$\Ck$, $\Ck[k]$, $\Ck[k+1]$, $\Ck[k+1][2]$,
$\nuk$, $\nuk[k]$, $\nuk[k+1]$, $\nuk[k][i]$.
% Take into account that unfortunately, you cannot use a command with an optional argument 
% as the optional argument for a command with an optional argument, i.e.:
% Not allowed: $\Ck[\nuk[k]]$
% Allowed: $\Ck[\nuk]$, $\Ck[\simplex{d}]$, $\simplex{\Ck[k]}$. 
{% endhighlight %}

$$C_k$$, $$C_k$$, $$C_{k+1}$$, $$C_{k+1}^2$$, $$\nu^{(k)}$$, $$\nu^{(k)}$$, $$\nu^{(k+1)}$$, $$\nu^{(k)}_i$$. 

You can use commands with links within a command with a link (or even in the definition of it). The inner link box will always be on top, so in `$\Ck[\nuk]$` $$C_{\nu_k}$$ you can click on both things.

### Bonus

Use the following at the beginning of the statement of a lemma, proposition, theorem, etc, whose proof does not appear right after. You will get a nice down-arrow linking to the exact point where the proof appears.

{% highlight tex %}
\newcommand\linktoproof[1]{ {\normalfont[{\hyperlink{#1}{$\downarrow$}}]} }
...\begin{lemma}\linktoproof{proof:lemma:my_lemma} Let... 
...
\begin{proof}\newtarget{proof:lemma:my_lemma}{}
...
{% endhighlight %}


### Readers and jumping back

This feature is really nice, but if you really want to enjoy it, you should learn how to jump back after clicking on a link, or you will find yourself annoyed and scrolling back all the time. I provide here a small table with some PDF readers and the shortcuts that are used to jump back.

| Reader | How to go back |
|-------|--------|
| Zathura | Ctrl + o (like in vim) |
| Firefox | Alt + Left  |
| Chrome | No option for jumping back :/ |
| Adobe Acrobat Reader| Alt + Left  |
| Okular  | Shift + Alt + Left  |
| Evince | Alt + p | 
| Sioyek | Ctrl + Left or Backspace | 
| Pdf Reader Pro | Press the `jump back` button |
| Xodo (Android or iOS)| Arrows appear |


<!--
| Reader | How to go back | How to follow a link | Notes |
|-------|--------|---------|---------|
| zathura | Ctrl + o (like in vim) | Double click or f+number | Shortcut can be customized |
| Firefox | Alt + Left | Single click | A nice box appears when the mouse pointer is over the link. The viewer is really pdfjs (can be installed in some other browsers, like Chrome/Chromium) |
| Chrome | No option of going back | Single click | One can install pdfjs extension (called PDF Viewer), which is what Firefox uses by default |
| Adobe Acrobat Reader: Alt + Left | Single click |
| Okular  | Shift + Alt + Left | Single click | Shortcut can be customized |
| Evince | Alt + p | Single click | |
| PDF Reader Pro | Press `Jump Back` button | Single Click | |
| Xodo (Android or iOS): Arrows appear | Single tap | |

-->
