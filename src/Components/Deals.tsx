import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { DealContext } from '../context/dealContext';
import { DealContextType, IDeal } from '../@types/deal';
import { Form } from 'react-bootstrap';

const Data = () => {

  const { filteredDeals, fetchDeals, filterDeals, resetFilter, isLoaded } = React.useContext(DealContext) as DealContextType;

  const [value, setValue] = useState('');
  const [from, setFromDate] = useState('');
  const [to, setToDate] = useState('');

  useEffect(() => {
    if (!isLoaded) {
      fetchDeals()
    }
  }, [])

  const groupBy = (data: any[], key: any) => {
    return data.reduce((pv, cv) => {
      (pv[cv[key]] = pv[cv[key]] || []).push(cv);
      return pv;
    }, {})
  }

  /* const handleClick = async () => {
    fetchDeals();
  } */

  const handleFilter = (e: any) => {
    e.preventDefault()
    filterDeals(value, from, to)
  }

  const getSummary = (data: IDeal[]) => {
    const stages = groupBy(data, 'stage')
    let summary = []
    for (const key in stages) {
      if (Object.prototype.hasOwnProperty.call(stages, key)) {
        const stageDeals: IDeal[] = stages[key];
        summary.push({
          stage: key,
          numberOfDeals: stageDeals.length,
          sumOfAmount: stageDeals.reduce((pv, deal) => pv + deal.amount, 0)
        });
      }
    }
    return summary
  }

  const handleReset = () => {
    resetFilter()
  }

  const summary = getSummary(filteredDeals);

  return (
    <div className='deals-root'>
      {/* <Button variant="secondary" onClick={handleClick}>Fetch Deals</Button> */}

      {isLoaded &&
        <main>
          <section className='col-md-4 mb-3'>
            <h5>Filter By</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control type="text" value={value} name='name' placeholder='Enter a name'
                  onChange={(e) => setValue(e.target.value.toLowerCase())}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="from">From:</Form.Label>
                <Form.Control type="date" value={from} name='from' placeholder='Enter a from date'
                  onChange={(e) => setFromDate(e.target.value.toLowerCase())}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="to">To:</Form.Label>
                <Form.Control type="date" value={to} name='to' placeholder='Enter a to date'
                  onChange={(e) => setToDate(e.target.value.toLowerCase())}
                />
              </Form.Group>
              <Button variant='primary' onClick={handleFilter} type='submit'>Filter</Button>{' '}
              <Button variant='outline-secondary' onClick={handleReset}>Reset Table</Button>
            </Form>
          </section>
          {summary.length ? <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Number Of Deals</th>
                <th>Sum Of Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                summary.map((item) => {
                  const { stage, numberOfDeals, sumOfAmount } = item;
                  return (
                    <tr key={stage}>
                      <td>{stage}</td>
                      <td>{numberOfDeals}</td>
                      <td>{sumOfAmount}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table> : <p>oops! data not found.</p>}
        </main>}
    </div>

  )
}

export default Data