import React from 'react';
import ContentLoader from 'react-content-loader'

  export const CircleLoader = (
    {
      primaryColor = '#f35184',
      secondaryColor= '#ec8f76',
    }) => <ContentLoader
		height={160}
		width={300}
		speed={3}
		primaryColor={primaryColor}
		secondaryColor={secondaryColor}
    style={{width: '100%', height: '10rem', margin: '3rem 0 0 0'}}
	>
		<circle cx="150" cy="80" r="80" />
	</ContentLoader>