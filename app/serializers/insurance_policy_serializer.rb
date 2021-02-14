class InsurancePolicySerializer
  include JSONAPI::Serializer
  attributes :policy_no, :customer_name, :insurer, :value, :insurance_type, :current_expiry, :asset, :customer, :renewals
  belongs_to :customer
  has_many :renewals
end
