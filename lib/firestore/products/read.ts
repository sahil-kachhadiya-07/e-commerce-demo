'use client'
import { collection,  limit,  onSnapshot, query, startAfter } from 'firebase/firestore'
import useSWRSubscription from 'swr/subscription'
import { db } from '../fierbase'
 
//onSnapshot is used to Get realtime updates with Cloud Firestore
//useSWRSubscription  is a React hook that allows subscribing to real-time data sources with SWR.

export function useProducts({pageLimit , lastSnapDoc}) {
  //reason behind the add pageLimit as key because wee need to get data according to pageLimit
  //because of only product key data will be fetched only once
  const { data , error} = useSWRSubscription(["products",pageLimit], ([path,pageLimit], { next }) => {
    
    const ref = collection(db,path);
    let q = query(ref,limit(pageLimit ?? 10));
    if(lastSnapDoc)
    {
      q = query(q,startAfter(lastSnapDoc));
    }
    //this syntax of onSnapshot
    const unsub = onSnapshot(q,
     (snapshot) => next(null, {
      list:snapshot.docs.length === 0 ? null : snapshot.docs.map((snap)=>snap.data())
     }),
    //   if error then null or data the snapshot
      err => next(err)
    )

    return () => unsub()
  })
  return {data,error:error?.message , isLoading:data===undefined}
}

//fetch data of categories using swr hook