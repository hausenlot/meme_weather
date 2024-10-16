Rails.application.routes.draw do
  root 'weather#index'
  post 'weather/update_coordinates', to: 'weather#update_coordinates'
  get 'toggle_forecast_mode', to: 'weather#toggle_forecast_mode'
end
