Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get '/routes', to: 'one_bus_away#routes'
      get '/routes/:id/stops', to: 'one_bus_away#stops'
      get '/stops/:id/arrivals', to: 'one_bus_away#arrivals'
    end
  end
end
