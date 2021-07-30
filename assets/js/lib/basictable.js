/*
 * @license Basictable - Vanilla JS | MIT | Jerry Low | https://www.github.com/jerrylow/basictable
 */

'use strict'

class basictable { // eslint-disable-line no-unused-vars
  constructor (tableSel, options = {}) {
    const _defaultOptions = {
      breakpoint: null,
      containerBreakpoint: null,
      contentWrap: true,
      forceResponsive: true,
      noResize: false,
      tableWrap: false,
      showEmptyCells: false,
      header: true
    }

    this.tableSel = tableSel
    this.options = { ..._defaultOptions, ...options }

    if (this.options.breakpoint === null && this.options.containerBreakpoint === null) {
      this.options.breakpoint = 568
    }

    this._getTables()
    this._setup()
  }

  // @TODO: Convert to private class fields when supported.
  _getTables () {
    this.tables = document.querySelectorAll(this.tableSel)
  }

  _setup () {
    this.tables.forEach(table => {
      table.setAttribute('data-bt-active', true)

      const headings = []

      if (this.options.tableWrap) {
        const tableWrapper = document.createElement('div')
        tableWrapper.classList.add('bt-wrapper')
        table.parentNode.insertBefore(tableWrapper, table)
        tableWrapper.appendChild(table)
      }

      if (this.options.header) {
        let format = ''

        if (table.querySelectorAll('thead tr th').length) {
          format = 'thead th'
        } else if (table.querySelectorAll('tbody tr th').length) {
          format = 'tbody tr th'
        } else if (table.querySelectorAll('th').length) {
          format = 'tr:first th'
        } else {
          format = 'tr:first td'
        }

        table.querySelectorAll(format).forEach(heading => {
          const colspan = parseInt(heading.getAttribute('colspan'), 10) || 1
          const parentRow = heading.closest('tr')
          const row = [].indexOf.call(parentRow.parentElement.children, parentRow)

          if (!headings[row]) {
            headings[row] = []
          }

          for (let i = 0; i < colspan; i++) {
            headings[row].push(heading)
          }
        })

        // Table Body
        table.querySelectorAll('tbody tr').forEach(row => this._setupRow(row, headings))

        // Table Footer
        table.querySelectorAll('tfoot tr').forEach(row => this._setupRow(row, headings))
      }

      if (!this.options.noResize) {
        this._check(table)
      }
    })

    if (!this.options.noResize) {
      this._tableResizeEvent = () => this._resize()
      window.addEventListener('resize', this._tableResizeEvent)
    }
  }

  _setupRow (row, headings) {
    row.querySelectorAll(':scope > *').forEach(cell => {
      if ((cell.innerHTML.trim() === '' || cell.innerHTML === '&nbsp;') && this.options.showEmptyCells) {
        cell.classList('bt-hide')
      } else {
        const cellIndex = [].indexOf.call(cell.parentElement.children, cell)

        let headingText = ''

        for (let j = 0; j < headings.length; j++) {
          if (j !== 0) {
            headingText += ': '
          }

          const heading = headings[j][cellIndex]
          headingText += heading.textContent
        }

        cell.setAttribute('data-th', headingText)

        // Wrap Cell Content
        const cellInnerWrapper = document.createElement('span')
        cellInnerWrapper.classList.add('bt-content')

        if (this.options.contentWrap && cell.firstChild !== cellInnerWrapper) {
          cell.appendChild(cellInnerWrapper)
          while (cell.firstChild !== cellInnerWrapper) {
            cellInnerWrapper.appendChild(cell.firstChild)
          }
        }
      }
    })
  }

  _check (table) {
    // Only change when table is larger than parent if force
    // responsive is turned off.
    if (!this.options.forceResponsive) {
      table.classList.remove('bt')
      const tableSize = table.getBoundingClientRect().left + table.offsetWidth

      if (tableSize > table.parentElement.offsetWidth) {
        this._start(table)
      } else {
        this._end(table)
      }
    } else {
      if ((this.options.breakpoint !== null && window.innerWidth <= this.options.breakpoint) || (this.options.containerBreakpoint !== null && table.parentElement.offsetWidth <= this.options.containerBreakpoint)) {
        this._start(table)
      } else {
        this._end(table)
      }
    }
  }

  _start (table) {
    table.classList.add('bt')

    if (!this.options.header) {
      table.classList.add('bt--no-header')
    }

    if (this.options.tableWrap) {
      table.closest('.bt-wrapper').classList.add('active')
    }
  }

  _end (table) {
    table.classList.remove('bt', 'bt--no-header')

    if (this.options.tableWrap) {
      table.closest('.bt-wrapper').classList.remove('active')
    }
  };

  _resize (table) {
    this.tables.forEach(table => {
      if (table.getAttribute('data-bt-active')) {
        this._check(table)
      }
    })
  };

  start () {
    this.tables.forEach(table => {
      this._start(table)
    })
  }

  stop () {
    this.tables.forEach(table => {
      this._end(table)
    })
  }

  restart () {
    this.destroy()
    this._getTables()
    this._setup()
  }

  destroy () {
    this.tables.forEach(table => {
      if (table.getAttribute('data-bt-active')) {
        table.classList.remove('bt', 'bt--no-header')
        table.removeAttribute('data-bt-active')
        const cells = table.querySelectorAll('td')
        cells.forEach(td => td.removeAttribute('data-th'))

        if (this.options.contentWrap) {
          cells.forEach(td => {
            const content = td.querySelector('.bt-content')
            if (content) {
              td.innerHTML = content.innerHTML
            }
          })
        }

        if (this.options.tableWrap) {
          table.parentNode.outerHTML = table.parentNode.innerHTML
        }
      }
    })

    if (!this.options.noResize) {
      window.removeEventListener('resize', this._tableResizeEvent)
    }
  }
};