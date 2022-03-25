import React from 'react'
import { View, Image, Text } from 'react-native'
import moment from 'moment'
import ArrowDown from './svgs/ArrowDown'

const Timeline = () => {
  const now = new moment()
  const addressDigits = 5
  const dummyTransactions = [
    {
      transactionType: 'Send',
      timestamp: now.format('MMM D') + ' at ' + now.format('HH:mm'),
      address: '0xCca2bd5957073026b56Cdaaeb282AD4a61619a3a',
      amount: 10,
      ticker: 'PBC'
    },
    {
      transactionType: 'Receive',
      timestamp: now.format('MMM D') + ' at ' + now.format('HH:mm'),
      address: '0xCca2bd5957073026b56Cdaaeb282AD4a61619a3a',
      amount: 40,
      ticker: 'PBC'
    }
  ]

  const TimelineRow = ({
    transactionType,
    timestamp,
    address,
    amount,
    ticker
  }) => {
    const isSendTransaction = transactionType === 'Send'
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 70,
          paddingHorizontal: 15
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Image
            source={require('../assets/downArrow.png')}
            style={[
              { height: 30, width: 30 },
              isSendTransaction && { transform: [{ rotate: '180deg' }] }
            ]}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginLeft: 15
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}
            >
              <Text>
                {transactionType}: {address.slice(0, addressDigits + 2)}...
                {address.slice(-addressDigits)}
              </Text>
            </View>
            <Text>{timestamp}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
        >
          <Text>
            {isSendTransaction ? '-' : '+'}
            {amount} {ticker}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <>
      {dummyTransactions.map(transaction => {
        return (
          <TimelineRow
            transactionType={transaction.transactionType}
            timestamp={transaction.timestamp}
            address={transaction.address}
            amount={transaction.amount}
            ticker={transaction.ticker}
          />
        )
      })}
    </>
  )
}

export default Timeline
