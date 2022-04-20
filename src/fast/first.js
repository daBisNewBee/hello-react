
/*
    基于React的 “fast”快速集成：
    https://www.fast.design/docs/integrations/react#using-the-components
*/ 

// "fast" 相关
  import {
    provideFASTDesignSystem,
    fastCard,
    fastButton,
    fastDivider
  } from '@microsoft/fast-components'
  import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
  import React from 'react';
  import "./first.css"

  import { Divider, dividerTemplate as template } from "@microsoft/fast-foundation";
  // import { dividerStyles as styles } from "./my-divider.styles";

  export const myDivider = Divider.compose({
      baseName: "divider",
      template,
      // styles,
  });

  provideFASTDesignSystem().register(fastDivider());

  const {wrap} = provideReactWrapper(
    React,
    provideFASTDesignSystem()
  );

  function RFast() {
    return (
     <FastCard class="fast-card">
        <h2>基于React的FAST使用</h2>
        <FastButton class="fast-button" appearance='accent' onclick={() => console.log("clicked")}>干我</FastButton>
        <fast-divider />
     </FastCard>
    )
  }


  export {RFast};
  export const FastCard = wrap(fastCard());
  export const FastButton = wrap(fastButton())