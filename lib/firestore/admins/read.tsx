'use client'
import { collection,  onSnapshot } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../fierbase'
 
//onSnapshot is used to Get realtime updates with Cloud Firestore
//useSWRSubscription  is a React hook that allows subscribing to real-time data sources with SWR.

export function useAdmins() {
  const { data , error} = useSWRSubscription(["admins"], ([path], { next }) => {
    
    const ref = collection(db,path);

    //this syntax of onSnapshot
    const unsub = onSnapshot(ref,
     (snapshot) => next(null, snapshot.docs.length === 0 ? null : snapshot.docs.map((snap)=>snap.data())),
    //   if error then null or data the snapshot
      err => next(err)
    )

    return () => unsub()
  })
 console.log('data', data)
  return {data,error:error?.message , isLoading:data===undefined}
}

//fetch data of categories using swr hook