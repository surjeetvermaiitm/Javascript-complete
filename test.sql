
SELECT * FROM FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_TEST;

SELECT Count(*) FROM FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_TEST;


delete from FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_TEST;


create or replace Table FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_TEST (
  clientId String,
  eventType String,
  eventDate Number,
  eventTimestamp Number,
  sessionId Number,
  userPseudoId String,
  userId String,
  source String,
  medium String,
//  platform String,
  isPurchase BOOLEAN,
  purchaseRevenue DOUBLE,
  referrer String,
  URL String
);


// DEV

SELECT * FROM FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_DEV;

SELECT * FROM FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_DEV where eventtype='purchase';

SELECT * FROM FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_DEV where userpseudoid='None';

SELECT DISTINCT EVENTDATE FROM FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_DEV where ClientId='Skinny_Mixes';

SELECT * FROM FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_DEV where referrer = 'https://www.skinnymixes.com/';

SELECT * FROM FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_DEV order by userpseudoid;

SELECT Count(*) FROM FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_DEV;



delete from FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_DEV;

create or replace Table FASTFRWD_DEV.FASTFRWD_SCHEMA.FASTFRWD_PIXEL_DEV (
  clientId String,
  eventType String,
  eventDate Number,
  eventTimestamp Number,
  sessionId Number,
  userPseudoId String,
  userId String,
  source String,
  medium String,
//  platform String,
  isPurchase BOOLEAN,
  purchaseRevenue DOUBLE,
  referrer String,
  URL String
);

SELECT * from FASTFRWD_DEV.FASTFRWD_SCHEMA.PRODUCT_MIX_COHORT_VIEW Where CLIENT_ID='Skinny_Mixes' and DATE<='2023-07-01';
SELECT * from FASTFRWD_DEV.FASTFRWD_SCHEMA.GA4_MONTHLY_DIGEST Where CLIENT_ID='Skinny_Mixes';
