import Search from '@/assets/icons/search'
import { css, DOMAIN_IMAGE_LOOT } from '@/lib/utils'

import Loader from '@/components/common/loader'
import ImageCard from '@/components/common/ui/Image'
import { gameController } from '@/services/controller'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

export default function SearchTab() {
  const { ref, inView } = useInView()
  const { useGetGamesV2 } = gameController()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useGetGamesV2({
      size: 30,
      title: search
    })

  const handleSearch = (value: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      setSearch(value)
    }, 500)
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const gameList = useMemo(
    () => data?.pages.flatMap((page) => page.content?.content) || [],
    [data]
  )

  return (
    <div className="w-full flex flex-col gap-5">
      <div css={stylesFn} className="relative w-full ">
        <input
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
          type="text"
          placeholder="Search"
        />
        <Search className="absolute w-3 h-3 right-[15px] top-[15px]" />
      </div>
      <div className="text-white text-2xl font-black">
        Search results for: {search}
      </div>

      {isLoading ? (
        <div className="w-full h-[400px] flex justify-center items-center">
          <Loader className="" size={40} />
        </div>
      ) : (
        <>
          {gameList && gameList?.length > 0 ? (
            <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-5">
              {gameList?.map((game) => (
                <ImageCard
                  key={game.id}
                  src={`${DOMAIN_IMAGE_LOOT}/${game.provider}/${game.id}.png`}
                  onClick={() =>
                    navigate(`/game-inside/${game?.provider}/${game?.id}`)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-white text-2xl font-black text-center">
              No results found
            </div>
          )}
        </>
      )}

      {/* Position for loading more */}
      <div ref={ref} className="w-full flex justify-center items-center "></div>

      {/* Loading more */}
      {isFetchingNextPage && (
        <div className="w-full flex justify-center items-center h-[40px]">
          <Loader className="w-[10px] h-[10px]" size={40} />
        </div>
      )}
    </div>
  )
}

// const stylesProvidertext = css`
//   background: radial-gradient(
//     237.29% 116.82% at 60.95% -22.92%,
//     #362c5a 0%,
//     #181526 100%
//   );
// `

const stylesFn = css`
  gap: 10px;
  input {
    width: 100%;
    display: flex;
    height: 40px;
    padding: 20px;
    justify-content: flex-end;
    align-items: center;
    border-radius: 15px;
    border: 1px solid #2e273c;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    outline: none;
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

    color: #6c6395;
    text-align: left;
    font-size: 14px;
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
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    }

    &:focus {
      border: 1px solid #2a2339;
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
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
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
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
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
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
