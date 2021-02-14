class InsurancePolicy < ApplicationRecord
  before_save :add_customer_name
  belongs_to :customer
  has_many :renewals, dependent: :destroy
  validates :policy_no, :insurer, :value, :insurance_type, :current_expiry, :customer_id, presence: true
  validates :policy_no, uniqueness: true

  def add_customer_name
    self.customer_name = "#{self.customer.first_name} #{self.customer.last_name}"
  end
end
