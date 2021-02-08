class Customer < ApplicationRecord
  has_many :insurance_policies, dependent: :destroy

  validates :uid, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
end
