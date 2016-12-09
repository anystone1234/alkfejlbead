function parsePrice(text) {
  return text.split('\n').map(line => {
    const index = line.indexOf(' ')
    const amount = line.substr(0, index)
    const type = line.substr(index + 1)
    return { amount, type }
  })
}

function insertPriceRow(price, $textarea) {
  const $row = $(`
    <div class="form-group smartPrice">
      <div class="col-md-3">
        <input required class="form-control smartPrice-amount" value="${price.amount}" type="text"
          pattern="^\\S*$"
        >
      </div>
      <div class="col-md-7">
        <input required class="form-control smartPrice-type" value="${price.type}" type="text">
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-danger btn-block">
          <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  `)
  $row.insertBefore($textarea)
  $('form').validator('update')
}

function collects() {
  const pricess = []
  $('.smartPrice').each(function () {
    $this = $(this)
    const amount = $this.find('.smartPrice-amount').val()
    const type = $this.find('.smartPrice-type').val()
    ingredients.push({ amount, type })
  })
  return prices
    // .map(ingr => `${ingr.amount} ${ingr.name}`)
    .map(({ amount, type }) => `${amount} ${type}`)
    .join('\n')
}

const $textarea = $('#price')
$textarea.hide()

$textarea.closest('.form-group')
  .on('click', 'button', function (e) {
    $(this).closest('.smartPrice').remove()
    $('form').validator('update')
  })

const prices = parsePrice( $textarea.val() )

prices.forEach(price => 
  insertPriceRow(price, $textarea)
)

$addButton = $(`
  <button type="button" class="btn btn-success btn-block">
    <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
  </button>
`)
  .insertAfter($textarea)
  .on('click', function (e) {
    insertPriceRow({
      amount: '', name: ''
    }, $textarea)
  })

$('form').on('submit', function (e) {
  $textarea.val( collectPrice() )
})