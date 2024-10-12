Rails.application.routes.draw do
  root 'weather#index'
  post 'weather/update_coordinates', to: 'weather#update_coordinates'
end
