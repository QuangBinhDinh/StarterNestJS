import { SetMetadata } from '@nestjs/common';

export const DEBUG_METADATA_KEY = 'DEBUG';
/**
 * Log the method response data into console
 */
export const Debug = () => SetMetadata(DEBUG_METADATA_KEY, 'true');

export const MESSAGE_METADATA_KEY = 'MESSAGE';
/**
 * Change the default message of the response
 * @param msg The message to be returned in the response
 * @returns
 */
export const Message = (msg: string) => SetMetadata(MESSAGE_METADATA_KEY, msg);

export const ERR_MESSAGE_METADATA_KEY = 'ERR_MESSAGE';
/**
 * Change the error message of the response
 * @param msg The message to be returned in the response
 * @returns
 */
export const ErrMessage = (msg: string) =>
  SetMetadata(ERR_MESSAGE_METADATA_KEY, msg);

export const PAGING_MEATATA_KEY = 'PAGING';
/**
 * If enabled, the method will receive 2 addtional params: page_id and page_size
 *
 * The response data will be filtered by these params, also return the "meta" object which includes page_count, total_count and has_next
 * @returns
 */
export const Paging = () => SetMetadata(PAGING_MEATATA_KEY, true);
