import React from 'react'
import { Icon } from '@iconify/react'

// Em React puro, imagens ficam na pasta "public"
// e são acessadas como /images/... no src do <img>
const tline = '/images/svgs/T-Line.svg'
const t_half_line = '/images/svgs/T-half_line.svg'
const straight_line = '/images/svgs/straight_group.svg'
const small_straight_line = '/images/svgs/smal_straight_line.svg'

export const PackageStructure = () => {
  const Counts = Array.from({ length: 31 }, (_, i) => i)

  return (
    <div id="structure" className="md:scroll-m-[130px] scroll-m-28">
      <h3 className="text-2xl font-semibold mt-8 text-black">Package Structure</h3>
      <div className="rounded-md p-6 pt-3 border border-dark_border border-opacity-60 mt-6">
        <div className="flex items-center gap-4">
          <h5 className="text-base font-medium text-muted mt-3 mb-1">
            ELearning Tailwind React Template
          </h5>
        </div>

        <ul className="ps-0 md:ps-5 list-unstyled">
          <li className="py-2">
            <div className="flex items-center gap-3">
              <p className="text-xl text-black">|—</p>
              <span className="font-medium text-muted">
                <Icon icon="tabler:folder" className="text-primary text-base inline-block me-2" />
                packages
              </span>
            </div>

            <ul className="ps-5 md:ps-5 list-unstyled">
              <li className="py-0">
                <ul className="ps-2 ps-md-3 list-unstyled">
                  <li className="py-2">
                    <ul className="ps-0 md:ps-5 list-unstyled">
                      {/* markdown */}
                      <li className="py-2">
                        <div className="flex items-center gap-3">
                          <p className="text-xl text-black">|—</p>
                          <span className="font-medium text-muted">
                            <Icon
                              icon="tabler:folder"
                              className="text-primary text-base inline-block me-2"
                            />
                            markdown
                          </span>
                        </div>
                      </li>

                      {/* public */}
                      <li className="py-2">
                        <div className="flex items-center gap-3">
                          <p className="text-xl text-black">|—</p>
                          <span className="font-medium text-muted">
                            <Icon
                              icon="tabler:folder"
                              className="text-primary text-base inline-block me-2"
                            />
                            public
                          </span>
                        </div>
                      </li>

                      {/* src */}
                      <li className="py-2">
                        <div className="flex items-center gap-3">
                          <p className="text-xl text-black">|—</p>
                          <span className="font-medium text-muted">
                            <Icon
                              icon="tabler:folder"
                              className="text-primary text-base inline-block me-2"
                            />
                            src
                          </span>
                        </div>

                        <div className="flex">
                          <div className="flex flex-col justify-between gap-2 mt-2">
                            {Counts.slice(0, 22).map((item) => (
                              <p key={item} className="text-xl text-black">
                                |
                              </p>
                            ))}
                          </div>

                          <ul className="ps-5 md:ps-12 list-unstyled">
                            {/* app */}
                            <li className="py-2">
                              <div className="flex items-center gap-3">
                                <p className="text-xl text-black">|—</p>
                                <span className="font-medium text-muted">
                                  <Icon
                                    icon="tabler:folder"
                                    className="text-primary text-base inline-block me-2"
                                  />
                                  app
                                </span>
                              </div>
                              {/* ... resto da estrutura igual ao original */}
                            </li>

                            {/* components */}
                            <li className="py-2">
                              <div className="flex items-center flex-wrap gap-3">
                                <p className="text-xl text-black">|—</p>
                                <span className="font-medium text-muted">
                                  <Icon
                                    icon="tabler:folder"
                                    className="text-primary text-base inline-block me-2"
                                  />
                                  components
                                </span>
                                <span className="fs-9 text-muted ms-4">
                                  (All the Components of this template.)
                                </span>
                              </div>
                            </li>

                            {/* styles */}
                            <li className="py-2">
                              <div className="flex items-center gap-3">
                                <p className="text-xl text-black">|—</p>
                                <span className="font-medium text-muted">
                                  <Icon
                                    icon="tabler:folder"
                                    className="text-primary text-base inline-block me-2"
                                  />
                                  styles
                                </span>
                              </div>
                            </li>

                            {/* types */}
                            <li className="py-2">
                              <div className="flex items-center gap-3">
                                <p className="text-xl text-black">|—</p>
                                <span className="font-medium text-muted">
                                  <Icon
                                    icon="tabler:folder"
                                    className="text-primary text-base inline-block me-2"
                                  />
                                  types
                                </span>
                              </div>
                            </li>

                            {/* utils */}
                            <li className="py-2">
                              <div className="flex items-center gap-3">
                                <p className="text-xl text-black">|—</p>
                                <span className="font-medium text-muted">
                                  <Icon
                                    icon="tabler:folder"
                                    className="text-primary text-base inline-block me-2"
                                  />
                                  utils
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* arquivos da raiz */}
                      <li className="py-2">
                        <div className="flex items-center gap-3">
                          <p className="text-xl text-black">|—</p>
                          <span className="font-medium text-muted">
                            <i className="ti ti-file me-2 text-primary font-bold" />
                            package.json
                          </span>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center gap-3">
                          <p className="text-xl text-black">|—</p>
                          <span className="font-medium text-muted">
                            <i className="ti ti-file me-2 text-primary font-bold" />
                            tailwind.config.js
                          </span>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center gap-3">
                          <p className="text-xl text-black">|—</p>
                          <span className="font-medium text-muted">
                            <i className="ti ti-file me-2 text-primary font-bold" />
                            tsconfig.json
                          </span>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
