---
author: Tim Bernhard
categories:
cover_image: false
date: 2020-06-02 21:12:31
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: barplot-with-broken-axis-in-r
social_image: false
template: post
title: "Barplot with Broken Axis in R"
translations:
  en: barplot-with-broken-axis-in-r
  de: barplot-mit-gebrochener-achse-in-r

---

Following scenario:
you have some data to be plotted in a bar plot with [R](https://www.r-project.org/).
Your data has – as it should – confidence intervals. 
Unfortunately, one of the few confidence intervals is huge and scales the whole plot in a way that the actual bars seem to have much similar height than they actually have.

A first attempt might be to use plotrix's [axis.break](https://www.rdocumentation.org/packages/plotrix/versions/3.7-7/topics/axis.break).
Unfortunately, you can neither plot your matrices nor set the width of the bars anymore.

I did not find any other ways to do this without considerable work in R (in contrast to Python, where the [brokenaxes](https://github.com/bendichter/brokenaxes) package suits all whishes).

That's why, in the following, I describe the work I have done in the end:

First, I set up two functions that are borrowed from [this article](http://sickel.net/blogg/?p=688).

```R
"cnvrt.coords" <-function(x,y=NULL){
# Stolen from the teachingDemos library, simplified for this use case
	xy <- xy.coords(x,y, recycle=TRUE)
	cusr <- par('usr')
	cplt <- par('plt')	
	plt <- list()
	plt$x <- (xy$x-cusr[1])/(cusr[2]-cusr[1])
	plt$y <- (xy$y-cusr[3])/(cusr[4]-cusr[3])
	fig <- list()
	fig$x <- plt$x*(cplt[2]-cplt[1])+cplt[1]
	fig$y <- plt$y*(cplt[4]-cplt[3])+cplt[3]
	return( list(fig=fig) )
}

subplot <- function(fun, x, y=NULL){
# Stolen from the teachingDemos l	ibrary, simplified for this use case
	old.par <- par(no.readonly=TRUE)
	on.exit(par(old.par))
	xy <- xy.coords(x,y)
	xy <- cnvrt.coords(xy)$fig
	par(plt=c(xy$x,xy$y), new=TRUE)
	fun
	tmp.par <- par(no.readonly=TRUE)
	return(invisible(tmp.par))
}
```

These functions provide a translation unit: the overall idea is to plot two separate plots in one, and these functions provide what is needed to convert between the coordinates of the hosting plot and the coordinates of the two guest, subplots, as well as to plot them.

Before using the functions, we need to have data to plot. Additionally, we must setup a few paramters for our gap.

```r
y_data_matrix <- matrix(read.csv("your_file_example.csv"))

# get x range of the sub for the host plot
x_val <- barplot(y_data_matrix, xpd=FALSE, beside=T, las=3)
x_range <- par()$usr[c(1,2)]

# MANUAL PARAMETERS
your_colors = c("brown4","coral2")
your_legend = c("brown", "coral")
y_range <- c(0, 345) # the total data y range (if no gap); TODO: replace for your data
gap_range <- c(220, 301) # the place of the gap; TODO: replace for your data
ticks <- c(0,20,40,60,80,100,120,140,160,180,200,320,340) # TODO: replace for your wishes

gap_size <- gap_range[2] - gap_range[1]
breakheight <- 0.1 * gap_size
y_low <- c(y_range[1], gap_range[1]) # the y range of the lower data set
y_top <- c(gap_range[2], y_range[2]) # the y range of the upper data set
lowspan <- c(0, gap_range[2] - gap_size) # the y range of the lower plot without gap
topspan <- c(lowspan[2] + breakheight, y_range[2] - gap_size) # the y range of the upper plot with gap
ticks_pos <- ticks
ticks_pos[ticks_pos > y_top[1]] <- ticks_pos[ticks_pos > y_top[1]] - gap_size

# Setting up an outer wireframe for the plots. 
plot(x_range, c(lowspan[1], topspan[2]), type='n', axes=FALSE, ylab='Your y label', xlab='')
```

Then, finally, we can plot the subplots.

```r
# Plotting the lower range in the lower part of the plot.
# xpd=FALSE to clip the bars
subplot(barplot(y_data_matrix, ylim=y_low, col=your_colors, xpd=FALSE,beside=T,las=3), x=x_range, y=lowspan)

# Error bars for bars that end in lower region of the gap
# make sure to cut whatever is necessary to plot the upper halfs later
idx_where_lowerplot <- y_error_range[,2] < lowspan[2]
y_error_range_lower <- y_error_range[idx_where_lowerplot,]
x_data_lower <- x_data[idx_where_lowerplot]
subplot(arrows(x_data_lower, y_error_range_lower[,1], x_data_lower, y_error_range_lower[,2], code=3, angle=90,length=0.025), x=x_range,y=lowspan)

# Plotting the upper range
# Again xpd=FALSE, names.arg is set up to avoid having
# the names plotted here, must be some easier way to do this but
# this works
subplot(barplot(y_data_matrix,ylim=y_top, col=your_colors,xpd=FALSE,beside=T,las=3,names.arg=vector(mode="character",length=length(y_data)),yaxt='n', axis.at=c(330)), x=x_range, y=topspan)

# make top of arrows again
y_error_range_upper <- y_error_range[!idx_where_lowerplot,]
x_data_upper <- x_data[!idx_where_lowerplot]
arrows(x_data_upper, y_error_range_upper[1], x_data_upper, y_error_range_upper[2] - gap_size, code=3, angle=90,length=0.025)

# Legend. An annoiance is that the colors comes in the opposite
# order than in the plot.
legend(x=30, y=topspan[2], fill=your_colors, legend=your_legend,horiz=F, bg="white")
```

So far so good. What is missing are the upper axes as well as any lines indicating the gap.
They can be added as follows, all in units of the outer, host coordinate system:

```r 
lowertop=lowspan[2]     # Where to end the lower axis
breakheight=5   # Height of the break
upperbot=lowertop+breakheight # Where to start the upper axes
markerheight=5 # Height difference for the break markers
markerwidth=5  # With of the break markers

# Draw the break markers:
y_axis_x_pos <- par()$usr[1]
lines(c(y_axis_x_pos-markerwidth/-2,y_axis_x_pos-markerwidth/2),c(lowertop-markerheight/2,lowertop+markerheight/2),xpd=TRUE)
lines(c(y_axis_x_pos-markerwidth/-2,y_axis_x_pos-markerwidth/2),c(upperbot-markerheight/2,upperbot+markerheight/2),xpd=TRUE)

title(line = 1, main = list("Your Title", cex = 1.5, col = "black", font = 1))

# draw the whole (outer) axis with our custom (inner) ticks
axis(side=2, at=ticks_pos, labels=ticks)
# and simply draw white over the range between the break markers
lines(c(y_axis_x_pos, y_axis_x_pos),c(lowertop+1, upperbot-1), col="white", lwd=2,xpd=TRUE)
```

Done. You might also want to draw a break marker over the error bar arrows:

```r
# draw the break markers for the upper arrows
lines(c(x_data_upper-markerwidth/-2,x_data_upper-markerwidth/2),c(lowertop-markerheight/2,lowertop+markerheight/2))
lines(c(x_data_upper-markerwidth/-2,x_data_upper-markerwidth/2),c(upperbot-markerheight/2,upperbot+markerheight/2))
# draw white on top of the arrow where we have the break
lines(c(x_data_upper, x_data_upper),c(lowertop+1, upperbot-1), col="white", lwd=2)
```

**NOTE**: Do not use broken axes if not absolutely necessary. Broken axes leave a bad smell and an impression of you trying to hide something. Don't hide or skew data or its presentation. Don't leave wrong impressions. Don't be bad.
