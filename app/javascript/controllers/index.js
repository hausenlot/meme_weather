// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import MapController from "./map_controller"
application.register("map", MapController)

import MapToggleController from "./map_toggle_controller"
application.register("map-toggle", MapToggleController)

import RainController from "./rain_controller"
application.register("rain", RainController)

import ScrollController from "./scroll_controller"
application.register("scroll", ScrollController)

import SvgAnimatorController from "./svg_animator_controller"
application.register("svg-animator", SvgAnimatorController)

import TooltipController from "./tooltip_controller"
application.register("tooltip", TooltipController)

import VideoController from "./video_controller"
application.register("video", VideoController)

import WeatherController from "./weather_controller"
application.register("weather", WeatherController)
