Bridge::Application.routes.draw do
  root to: "static_pages#home"
  resources :users
  resource :session
end
