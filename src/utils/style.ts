import { css } from '@emotion/react'

export const stylesInput = css`
  gap: 10px;
  input {
    width: 100%;
    display: flex;
    height: 40px;
    padding: 20px;
    justify-content: flex-end;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #2e273c;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    outline: none;
    // box-shadow:
    //   6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    //   -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

    color: #6c6395;
    text-align: left;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;

    &:hover {
      outline: none;
      border: 1px solid #453561;
      background:
        linear-gradient(
          0deg,
          rgba(154, 103, 255, 0.2) 0%,
          rgba(154, 103, 255, 0.2) 100%
        ),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      //box-shadow:
      //  6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      //  -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    }

    &:focus {
      border: 1px solid #2a2339;
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      //box-shadow:
      //  6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      //  -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    }
    &:disabled {
      cursor: not-allowed;
      border: 1px solid #3a3248;
      background:
        linear-gradient(
          0deg,
          rgba(97, 97, 97, 0.2) 0%,
          rgba(97, 97, 97, 0.2) 100%
        ),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      //box-shadow:
      //  6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      //  -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      &:hover,
      &:focus {
        background:
          linear-gradient(
            0deg,
            rgba(97, 97, 97, 0.2) 0%,
            rgba(97, 97, 97, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
        //box-shadow:
        //  6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        //  -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      }
    }
  }
  .description {
    color: #6c6395;
    font-size: 10px;
    font-weight: 700;
    line-height: normal;
    padding-top: 10px;
  }
`
