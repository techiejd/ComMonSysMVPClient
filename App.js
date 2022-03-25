import React from 'react'
import { SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native'

import Transactions from './components/Transactions'
import ShopsMap from './components/Shops'
import Timeline from './components/Timeline'
import Spacer from './components/Spacer'

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}
      >
        <Transactions />
        <Spacer />
        <ShopsMap />
        <Spacer />
        <Timeline />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
