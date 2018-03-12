import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Select from 'react-select'
import {loader, fetchChiefdoms, COMPARISON_URL} from './redux'
import {Link, NavLink, withRouter} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

import {parse, stringify} from 'qs'

import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'
import 'react-select/dist/react-select.css'
import './diff.css'

const DEFAULT_COMPARISON_LEVEL = 3
const DEFAULT_FACILITIES_LEVEL = 4

const getValue = (obj, index) => {
  if (obj === null) {
    return {'name': 'None', 'code': `${index + 1}`}
  }
  return obj
}

const getNextLevel = (currentLevel = DEFAULT_COMPARISON_LEVEL) => {
  const nextLevel = currentLevel + 1
  return nextLevel
}

const TableRow = (props) => {
  const nextLevel = getNextLevel(props.currentLevel)

  const classNames = {
    NEW: 'badge badge-pill badge-new',
    DIFFERENT: 'badge badge-pill badge-different',
    DELETED: 'badge badge-pill badge-delete',
    MATCH: 'badge badge-pill badge-match'
  }

  const data = props.data
  const tableRows = data.map((value, index) => {
    const hfr = getValue(value.hfr, index)
    const dhis2 = getValue(value.dhis2, index)
    const cssClass = classNames[value.label]

    return (
      <tr key={index}>
        <td key={dhis2.code}>{dhis2.name}</td>
        <td key={hfr.code}>{hfr.name}</td>
        <td key={value.pk}><span className={`${cssClass}`}>{value.label}</span></td>
        { !(props.currentLevel === DEFAULT_FACILITIES_LEVEL) &&
        <td className='text-center action-icon'>
          <Link to={`/diff/?level=${nextLevel}&parentCode=${hfr.code}`}>
            <span>
              <i className='fa fa-caret-square-o-right' aria-hidden='true' data-tip='Click to view facilities' />
            </span>
          </Link>
          <ReactTooltip place='bottom' effect='float' />
        </td>
        }
      </tr>
    )
  })

  return (
    <tbody>
      {tableRows}
    </tbody>
  )
}

const DiffTable = (props) => {
  const { diffData } = props.diff.chiefdoms.data

  return (
    <div className='tablo th'>
      <div className='tablo-header'>
        <div className='row'>
          <div className='col-sm-12'>
            <i className='fa fa-search th icon-search' />
            <input
              className='th table-search form-control'
              type='search'
              placeholder='Search' />
          </div>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-bordered table-condensed table-hover'>
          <thead>
            <tr>
              <th>DHIS2 {props.tableLabel}</th>
              <th>HFR {props.tableLabel}</th>
              <th>Comparison Result</th>
              { !(props.currentLevel === DEFAULT_FACILITIES_LEVEL) && <th className='text-center'> Action </th> }
            </tr>
          </thead>
          <TableRow data={diffData} currentLevel={props.currentLevel} />
        </table>
      </div>
    </div>
  )
}

const options = [
    { value: 3, label: 'New' },
    { value: 1, label: 'Match' },
    { value: 2, label: 'Different' },
    { value: 4, label: 'Deleted' }
]

export const Pagination = ({
  currentPage,
  totalPages,
  handlePage
}) => {
  return (
    <UltimatePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onChange={handlePage} />
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  handlePage: PropTypes.func
}
let breadCrumbs = [
  {}, {},
  {title: 'Chiefdoms', url: '/diff'},
  {title: 'Facilities', url: '#'}
]

const getBreadCrumb = (level) => {
  return {
    previousLocation: breadCrumbs[level - 2],
    currentLocation: breadCrumbs[level - 1]
  }
}

const getQueryParams = (props) => {
  const params = parse(props.location.search.substr(1))
  const parentCode = params.parentCode || undefined
  const level = params.level || DEFAULT_COMPARISON_LEVEL
  const label = params.label || undefined

  return {
    parentCode, level, label
  }
}

export class DiffContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handlePage = this.handlePage.bind(this)
    this.runFetch = this.runFetch.bind(this)

    this.state = {
      activePage: 1
    }
  }

  handlePage (page) {
    this.setState({
      activePage: page
    }, this.runFetch)
  }

  componentDidMount () {
    this.runFetch()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.setState({
        activePage: 1
      }, this.runFetch)
    }
  }

  runFetch () {
    const params = getQueryParams(this.props)
    const level = params.level
    const parentCode = params.parentCode
    const label = params.label

    const action = fetchChiefdoms({
      url: `${COMPARISON_URL}/level-${level}/`,
      params: {
        parent_code: parentCode,
        label: label,
        page: this.state.activePage
      }
    })
    this.props.dispatch(action)
  }

  render () {
    const { data } = this.props.diff.chiefdoms
    let count
    if (data) {
      count = data.totalItems
    }
    const numberOfPages = Math.ceil(count / 10)
    const level = parseInt(getQueryParams(this.props).level, 10)
    const label = parseInt(getQueryParams(this.props).label, 10)
    const breadCrumb = getBreadCrumb(level)
    const onLabelChange = (e) => {
      const label = e ? e.value : null
      const queryString = stringify({
        ...getQueryParams(this.props),
        label: label
      })
      this.props.history.push(`/diff/?${queryString}`)
    }

    return (
      <div className='col-sm-12 diff-container c-box'>
        <h2 className='page-heading'>
          {breadCrumb.currentLocation.title} Comparison
        </h2>
        <div className='filter-row row'>

          <div className='col-sm-6'>
            <ul className='breadcrumb has-homepage'>
              <li >
                {
                  breadCrumb.previousLocation.url &&
                  <NavLink to={breadCrumb.previousLocation.url} activeClassName='active'>
                  All {breadCrumb.previousLocation.title} <span><i className='fa fa-chevron-right' aria-hidden='true' /></span>
                  </NavLink>
                }
              </li>
              <li>
                {breadCrumb.currentLocation.title}
              </li>
            </ul>
          </div>

          <div className='col-sm-6'>
            <Select
              className='task-drop'
              name='form-field-name'
              options={options}
              value={label}
              placeholder='Filter Here'
              searchable
              onChange={onLabelChange}
            />
          </div>
        </div>
        {
          !loader.hasData(this.props.diff) &&
          <div>No data</div>
        }
        {
          loader.hasData(this.props.diff) &&
          <div>
            <DiffTable {...this.props} currentLevel={level} tableLabel={breadCrumb.currentLocation.title} />
            <div className='row'>
              <div className='col-sm-6' />
              <div className='col-sm-6'>
                <Pagination
                  currentPage={this.state.activePage}
                  totalPages={numberOfPages}
                  handlePage={this.handlePage} />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  diff: state.diff
})

export default withRouter(connect(mapStateToProps)(DiffContainer))
