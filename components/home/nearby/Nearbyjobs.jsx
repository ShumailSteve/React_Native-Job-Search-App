import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS, SIZES } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'

const NearbyJobs = () => {
  const router = useRouter()
  const { data, isLoading, error } = useFetch
  ('search', {
    query: 'React Native',
    num_pages: 1 
  })

  return (
    <View style={styles.container}>

      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      {/* Jobs */}
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ): error ? (
          <Text>Something went wrong</Text>
        ): (
          data?.map((job) => (
            <NearbyJobCard 
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={ () => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>

    </View>
  )
}

export default NearbyJobs