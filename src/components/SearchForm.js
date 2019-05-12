import React, {PureComponent} from 'react'

export class SearchForm extends PureComponent {
  render() {
    return (
      <form>
        <input
          id="category"
          name="category"
          label="Category"
          type="text"
          margin="normal"
          value={this.props.category || ''}
          onChange={this.props.change}
        />
      </form>
    )
  }
}