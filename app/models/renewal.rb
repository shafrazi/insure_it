class Renewal < ApplicationRecord
  belongs_to :insurance_policy
  validates :policy_no, :start_date, :expiry_date, :insurance_policy_id, :insurer, presence: true
end
