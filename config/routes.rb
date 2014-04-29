Bridge::Application.routes.draw do
  root to: "static_pages#home"
    get "static_pages/root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :destroy]
    resources :tags, only: [:index, :create]
    resources :passion_joins, only: [:create, :destroy]
    resources :skill_joins, only: [:create, :destroy]
    resources :projects, only: [:create, :show, :update, :destroy]
  end

  resource :session, only: [:new, :create, :destroy]
end
