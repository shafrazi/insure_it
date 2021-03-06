Rails.application.routes.draw do
  root to: "pages#index"

  namespace :api do
    resources :customers
    resources :insurance_policies
    resources :renewals
  end

  get "*path", to: "pages#index", via: :all
end
