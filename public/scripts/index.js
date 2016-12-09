const $panels = $('.panel')
$panels.each(function() {
    const $panel = $(this)
    const db = $panel.find('.list-group-item').length
    $panel.find('.panel-heading').append(` (${db}) `)
})

$headings = $('.panel-heading')
$headings.on('click', function () {
    const $ul = $(this).next()
    $ul.slideToggle()
})
