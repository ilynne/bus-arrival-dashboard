class OneBusAway

  # http://developer.onebusaway.org/modules/onebusaway-application-modules/1.1.14/api/where/index.html
  include HTTParty

  class Parser::VndApiJson < HTTParty::Parser
    SupportedFormats.merge!({"application/vnd.api+json" => :json})
  end

  base_uri 'http://api.pugetsound.onebusaway.org'

  class << self

    def routes_for_agency(agency_id = 1)
      response = get("/api/where/routes-for-agency/#{agency_id}.json",
                     query: key_param)
      response.parsed_response
    rescue
      {}
    end

    def stops_for_route(route_id)
      response = get("/api/where/stops-for-route/#{route_id}.json",
                     query: key_param)
      response.parsed_response
    rescue
      {}
    end

    def arrivals_and_departures_for_stop(stop_id)
      response = get("/api/where/arrivals-and-departures-for-stop/#{stop_id}.json",
                     query: key_param)
      response.parsed_response
    rescue
      {}
    end

    private

    def key_param
      { key: BusArrivalDashboard::Application.credentials.one_bus_away }
    end
  end
end
