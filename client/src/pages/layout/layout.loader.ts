import { toast } from "react-toastify";
import { type AxiosResponse } from "axios";
import server from "../../utils/axios.util";
import { type ResponseType } from "../../utils/response.util";
import { type LoaderFunction } from "react-router-dom";

export type LoggedInUserData = {
  uid: string;
  name: string;
};

export type SessionData =
  | {
      loggedIn: false;
    }
  | {
      loggedIn: true;
      user: {
        uid: string;
        name: string;
      };
    };

const RootLayoutLoader: LoaderFunction = (): Promise<SessionData> => {
  return new Promise<SessionData>(
    (
      resolve: (value: SessionData | PromiseLike<SessionData>) => void,
      reject: (reason?: unknown) => void
    ): void => {
      server
        .post("/api/user/refresh")
        .then(({ data }: AxiosResponse<ResponseType<SessionData>>): void => {
          if (data.success) {
            //   toast.success("Session Refreshed");
            if (!data.data) {
              resolve({
                loggedIn: false,
              });
              return;
            }
            const { uid, name } = data.data as unknown as LoggedInUserData;
            resolve({
              loggedIn: true,
              user: {
                uid,
                name,
              },
            });
          } else {
            data.errors.forEach((error: string): void => {
              toast.error(error);
            });
            resolve({
              loggedIn: false,
            });
          }
        })
        .catch((error: Error): void => {
          console.error(error);
          reject(error);
        });
    }
  );
};

export default RootLayoutLoader;
