---
author: Tim Bernhard
categories:
cover_image: false
date: 2020-06-02 21:12:31
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: barplot-mit-gebrochener-achse-in-r
social_image: false
template: post
title: "Barplot mit gebrochener Achse in R"
translations:
  en: barplot-with-broken-axis-in-r
  de: barplot-mit-gebrochener-achse-in-r

---

Folgendes Szenario:
Sie haben einige Daten, die in einem Balkendiagramm dargestellt werden sollen. Mit [R](https://www.r-project.org/).
Ihre Daten haben – wie es sollten – Konfidenzintervalle. 
Leider ist eines der Konfidenzintervalle riesig und skaliert den ganzen Plot so, dass die eigentlichen Balken eine viel ähnlichere Höhe zu haben scheinen, als sie tatsächlich haben.

Ein erster Versuch könnte darin bestehen, plotrix's [axis.break](https://www.rdocumentation.org/packages/plotrix/versions/3.7-7/topics/axis.break) zu nutzen.
Leider können Sie damit weder Ihre Matrizen plotten, noch die Breite der Balken manuell einstellen.

Ich habe keine anderen Möglichkeiten gefunden, dies ohne erhebliche Arbeit in R zu tun (im Gegensatz zu Python, wo das [brokenaxes](https://github.com/bendichter/brokenaxes) Paket alle Wünsche erfüllt).

Deshalb beschreibe ich im Folgenden den Weg, wie ich es am Ende hingekriegt habe:

Zunächst habe ich zwei Funktionen eingerichtet, die von [diesem Artikel](http://sickel.net/blogg/?p=688) geklaut sind.

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

Diese Funktionen bieten eine Übersetzungseinheit: Die Gesamtidee besteht darin, zwei separate Plots in einem zu zeichnen, und diese Funktionen bieten, was erforderlich ist, um zwischen den Koordinaten des Mutter-Plots und den Koordinaten der beiden Subplots zu konvertieren und sie darzustellen.

Bevor wir die Funktionen verwenden, müssen wir Daten zum Plotten haben. Darüber hinaus müssen wir ein paar Paramter für unsere Achsen-Lücke einrichten.

```r
y_data_matrix <- matrix(read.csv("your_file_example.csv"))

# get x range of the sub for the host plot
x_val <- barplot(y_data_matrix, xpd=FALSE, beside=T, las=3)
x_range <- par()$usr[c(1,2)]

# MANUAL PARAMETERS
your_colors = c("brown4","coral2")
your_legend = c("brown", "coral")
y_range <- c(0, 345) # the total data y range (if no gap); TODO: Ihren Daten gemäss anpassen
gap_range <- c(220, 301) # the place of the gap; TODO: Ihren Daten gemäss anpassen
ticks <- c(0,20,40,60,80,100,120,140,160,180,200,320,340) # TODO: Ihren Daten gemäss anpassen

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

Dann können wir schließlich die Subplots darstellen.

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
legend(x=30,y=topspan[2],fill=your_colors,legend=your_legend,horiz=F,bg="white")
```

So weit so gut. Was fehlt, sind die oberen Achsen sowie alle Linien, die den Unterbruch anzeigen.
Sie können wie folgt hinzugefügt werden (alle Zahlen in Einheiten des äusseren Host/Mutter-Koordinatensystems):

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

Fertig. Sie können auch einen Bruchmarker über die Konfidenz-Intervall-Pfeile zeichnen:

```r
# draw the break markers for the upper arrows
lines(c(x_data_upper-markerwidth/-2,x_data_upper-markerwidth/2),c(lowertop-markerheight/2,lowertop+markerheight/2))
lines(c(x_data_upper-markerwidth/-2,x_data_upper-markerwidth/2),c(upperbot-markerheight/2,upperbot+markerheight/2))
# draw white on top of the arrow where we have the break
lines(c(x_data_upper, x_data_upper),c(lowertop+1, upperbot-1), col="white", lwd=2)
```

**Vorsicht**: Verwenden Sie keine gebrochenen Achsen, wenn diese nicht unbedingt erforderlich sind. Gebrochene Achsen hinterlassen einen schlechten Geruch und den Eindruck, dass Sie versuchen, etwas zu verbergen. Verstecken oder verzerren Sie keine Daten oder deren Darstellung. Hinterlassen Sie keine falschen Eindrücke. Seien Sie nicht böse.
