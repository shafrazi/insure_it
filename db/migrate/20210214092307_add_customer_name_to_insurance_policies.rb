class AddCustomerNameToInsurancePolicies < ActiveRecord::Migration[6.1]
  def change
    add_column :insurance_policies, :customer_name, :string
  end
end
