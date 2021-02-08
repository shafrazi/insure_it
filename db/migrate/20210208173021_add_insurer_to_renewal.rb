class AddInsurerToRenewal < ActiveRecord::Migration[6.1]
  def change
    add_column :renewals, :insurer, :string
  end
end
