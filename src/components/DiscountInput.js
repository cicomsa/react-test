import React, {PureComponent} from 'react'

export class DiscountInput extends PureComponent {
  render() {
    return (
      <div>
        <form>
          <input
            id="discount"
            name="discount"
            label="Discount"
            type="text"
            margin="normal"
            value={this.props.discount || ''}
            onChange={this.props.apply}
          />
        </form>
      </div>
    )
  }
}