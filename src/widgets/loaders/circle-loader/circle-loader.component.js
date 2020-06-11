import React from 'react';
import ContentLoader from 'react-content-loader'

  export const CircleLoader = (
    {
      backgroundColor = '#f35184',
      foregroundColor= '#ec8f76',
    }) => <ContentLoader
		height={160}
		width={300}
		speed={3}
		backgroundColor={backgroundColor}
		foregroundColor={foregroundColor}
    style={{width: '100%', height: '10rem', margin: '3rem 0 0 0'}}
	>
		<circle cx="150" cy="80" r="80" />
	</ContentLoader>