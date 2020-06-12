class Api::V1::OneBusAwayController < ApplicationController
  def routes
    # this should be cached
    routes = Rails.cache.fetch("routes", expires_in: 300.seconds) do
      OneBusAway.routes_for_agency
    end
    render json: routes
  end

  def stops
    stops = OneBusAway.stops_for_route(params[:id])
    render json: stops
  end

  def arrivals
    arrivals = OneBusAway.arrivals_and_departures_for_stop(params[:id])
    render json: arrivals
  end
end
