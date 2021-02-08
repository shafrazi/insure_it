class InsurancePolicy < ApplicationRecord
  belongs_to :customer
  has_many :renewals, dependent: :destroy
  validates :policy_no, :insurer, :value, :insurance_type, :current_expiry, :customer_id, presence: true
  validates :policy_no, uniqueness: true
end
